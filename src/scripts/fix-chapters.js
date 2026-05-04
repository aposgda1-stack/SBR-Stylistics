const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/chapters.json');

// Read as UTF-8 text
let content = fs.readFileSync(filePath, 'utf8');

// Remove BOM if present
if (content.charCodeAt(0) === 0xFEFF) {
  content = content.slice(1);
  console.log('BOM removed');
}

// Apply the 4 targeted string replacements
// Each is unique enough in context to be safe

// 1. ch4-s1: nextLesson = "ch4-s2" -> ""  (ch4-s2 doesn't exist)
const before1 = content.includes('"ch4-s2"');
content = content.replace('"ch4-s2"', '""');
console.log('Fix ch4-s1 nextLesson:', before1 ? '✅' : '❌ not found');

// 2. ch5-s1: nextLesson = "ch6-s1" -> ""  (cross-chapter, handled by smart nav)
//    Only the nextLesson field contains this as a value (ch6-s1 as an ID won't be in quotes alone)
//    Use a safe context-aware replace targeting the nextLesson field pattern
const before2 = content.includes('"nextLesson":  "ch6-s1"') || content.includes('"nextLesson": "ch6-s1"');
content = content.replace(/"nextLesson":\s+"ch6-s1"/, '"nextLesson": ""');
console.log('Fix ch5-s1 nextLesson:', before2 ? '✅' : '❌ not found');

// 3. ch7-s1: nextLesson = "ch9-s1" -> "" (cross-chapter)
const before3 = content.includes('"nextLesson":  "ch9-s1"') || content.includes('"nextLesson": "ch9-s1"');
content = content.replace(/"nextLesson":\s+"ch9-s1"/, '"nextLesson": ""');
console.log('Fix ch7-s1 nextLesson:', before3 ? '✅' : '❌ not found');

// 4. ch9-s1: quizId = "quiz-ch9-s1" -> "" (no questions exist)
const before4 = content.includes('"quiz-ch9-s1"');
content = content.replace('"quiz-ch9-s1"', '""');
console.log('Fix ch9-s1 quizId:', before4 ? '✅' : '❌ not found');

// Save back WITHOUT BOM
fs.writeFileSync(filePath, content, { encoding: 'utf8' });
console.log('\nSaved successfully. Verifying...');

// Verify
const verify = fs.readFileSync(filePath, 'utf8');
const firstBytes = Buffer.from(verify).slice(0, 3);
console.log('First 3 bytes (hex):', firstBytes.toString('hex'), '— should be 5b0d0a or 5b0a');

// Quick JSON parse check
try {
  JSON.parse(verify);
  console.log('JSON is VALID ✅');
} catch(e) {
  console.log('JSON ERROR:', e.message);
}
