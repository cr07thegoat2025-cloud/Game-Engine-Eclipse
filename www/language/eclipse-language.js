/*
 * Eclipse Language (ECL) v0.1
 * Deterministic sentence-based DSL prototype.
 * This is a language prototype, not a complete game runtime.
 */
(function (root) {
  'use strict';

  class ECLParseError extends Error {
    constructor(message, line) {
      super(`Line ${line}: ${message}`);
      this.name = 'ECLParseError';
      this.line = line;
    }
  }

  const clean = value => value.trim().replace(/[.!]+$/, '').trim();
  const unquote = value => value.slice(1, -1);
  const parseValue = raw => {
    const value = raw.trim();
    if (/^(['"]).*\1$/.test(value)) return unquote(value);
    if (/^(true|false)$/i.test(value)) return value.toLowerCase() === 'true';
    if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
    return value;
  };

  function parseAction(text, line) {
    let match;
    if ((match = text.match(/^show\s+(.+)$/i))) return { type: 'show', message: parseValue(match[1]) };
    if ((match = text.match(/^make ([\w -]+) jump$/i))) return { type: 'jump', target: match[1].trim() };
    if ((match = text.match(/^destroy ([\w -]+)$/i))) return { type: 'destroy', target: match[1].trim() };
    if ((match = text.match(/^move ([\w -]+) to (-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)$/i))) {
      return { type: 'move', target: match[1].trim(), position: [Number(match[2]), Number(match[3]), Number(match[4])] };
    }
    throw new ECLParseError(`Unsupported event action "${text}".`, line);
  }

  function parse(source) {
    const program = [];
    const lines = String(source).split(/\r?\n/);
    for (let index = 0; index < lines.length; index++) {
      const line = clean(lines[index]);
      const number = index + 1;
      if (!line || line.startsWith('#') || line.startsWith('//')) continue;
      let match;
      if ((match = line.match(/^create (?:a )?(player|object|light|camera) named ([\w -]+)$/i))) {
        program.push({ type: 'create', kind: match[1].toLowerCase(), name: match[2].trim(), line: number });
      } else if ((match = line.match(/^set ([\w -]+?)(?:'s|’s) ([\w -]+) to (.+)$/i))) {
        program.push({ type: 'set', target: match[1].trim(), property: match[2].trim().toLowerCase(), value: parseValue(match[3]), line: number });
      } else if ((match = line.match(/^move ([\w -]+) to (-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)$/i))) {
        program.push({ type: 'move', target: match[1].trim(), position: [Number(match[2]), Number(match[3]), Number(match[4])], line: number });
      } else if ((match = line.match(/^when (.+?),\s*(show .+|make .+|move .+|destroy .+)$/i))) {
        program.push({ type: 'event', trigger: match[1].trim(), action: parseAction(match[2], number), line: number });
      } else if (/^show\s+.+$/i.test(line)) {
        program.push({ type: 'show', message: parseValue(line.replace(/^show\s+/i, '')), line: number });
      } else if ((match = line.match(/^make ([\w -]+) jump$/i))) {
        program.push({ type: 'action', action: { type: 'jump', target: match[1].trim() }, line: number });
      } else if ((match = line.match(/^destroy ([\w -]+)$/i))) {
        program.push({ type: 'action', action: { type: 'destroy', target: match[1].trim() }, line: number });
      } else {
        throw new ECLParseError(`I don't understand "${line}". See LANGUAGE-GUIDE.md for supported sentence patterns.`, number);
      }
    }
    return program;
  }

  function execute(program, host = {}) {
    const objects = new Map();
    const events = [];
    const log = [];
    const emit = (type, data) => { if (typeof host.onCommand === 'function') host.onCommand(type, data); };
    for (const node of program) {
      switch (node.type) {
        case 'create': {
          if (objects.has(node.name)) throw new ECLParseError(`An object named "${node.name}" already exists.`, node.line);
          const object = { name: node.name, kind: node.kind, properties: {}, position: [0, 0, 0] };
          objects.set(node.name, object); emit('create', object); break;
        }
        case 'set': {
          const object = objects.get(node.target);
          if (!object) throw new ECLParseError(`I can't find "${node.target}". Create it first.`, node.line);
          object.properties[node.property] = node.value;
          emit('set', { target: object, property: node.property, value: node.value }); break;
        }
        case 'move': {
          const object = objects.get(node.target);
          if (!object) throw new ECLParseError(`I can't find "${node.target}".`, node.line);
          object.position = node.position.slice(); emit('move', object); break;
        }
        case 'show': log.push(String(node.message)); emit('show', String(node.message)); break;
        case 'event': events.push(node); emit('event', node); break;
        case 'action': runAction(node.action, objects, log, emit, node.line); break;
      }
    }
    return { objects, events, log };
  }

  function runAction(action, objects, log, emit, line) {
    if (action.type === 'show') { log.push(String(action.message)); emit('show', String(action.message)); return; }
    const object = objects.get(action.target);
    if (!object) throw new ECLParseError(`I can't find "${action.target}".`, line || 1);
    if (action.type === 'jump') emit('jump', object);
    if (action.type === 'destroy') { objects.delete(action.target); emit('destroy', object); }
    if (action.type === 'move') { object.position = action.position.slice(); emit('move', object); }
  }

  function run(source, host) { return execute(parse(source), host); }
  root.EclipseLanguage = { parse, execute, run, ECLParseError };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.EclipseLanguage;
})(typeof globalThis !== 'undefined' ? globalThis : this);
