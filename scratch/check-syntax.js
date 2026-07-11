const fs = require('fs');
const content = fs.readFileSync('c:\\react project\\pndit\\src\\components\\puja\\PujaDetailsClient.tsx', 'utf8');

// Find all HTML tags (ignoring self-closing ones like <img />, <input />, <Fi... />)
const tagRegex = /<\/?([a-zA-Z0-9]+)(?:\s+[^>]*?)?>/g;
let match;
let stack = [];
let lines = content.split('\n');

// We will find tags and their line numbers
let tags = [];
for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  // Remove comments
  line = line.replace(/\/\/.*$/g, '');
  line = line.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  
  let match;
  while ((match = tagRegex.exec(line)) !== null) {
    const fullTag = match[0];
    const tagName = match[1];
    const isClosing = fullTag.startsWith('</');
    const isSelfClosing = fullTag.endsWith('/>') || ['img', 'br', 'hr', 'input'].includes(tagName.toLowerCase());
    
    if (isSelfClosing) continue;
    
    tags.push({
      name: tagName,
      line: i + 1,
      text: fullTag,
      isClosing: isClosing
    });
  }
}

for (let tag of tags) {
  if (!tag.isClosing) {
    stack.push(tag);
  } else {
    if (stack.length === 0) {
      console.log(`Unmatched closing tag at line ${tag.line}: ${tag.text}`);
    } else {
      let last = stack.pop();
      if (last.name !== tag.name) {
        console.log(`Tag mismatch: opened ${last.name} at line ${last.line} but closed with ${tag.name} at line ${tag.line}`);
      }
    }
  }
}

while (stack.length > 0) {
  let last = stack.pop();
  console.log(`Unclosed tag: ${last.name} opened at line ${last.line}`);
}
console.log("Done checking tags.");
