// Simple Node.js script to replace green color classes with Mubito colors
const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/TeacherDashboard.js',
  'src/pages/AdminDashboard.js',
  'src/pages/AdminUpload.js'
];

const replacements = [
  ['bg-green-50', 'bg-gray-50'],
  ['bg-green-700', 'bg-mubito-maroon'],
  ['bg-green-600', 'bg-mubito-maroon'],
  ['hover:bg-green-700', 'hover:bg-mubito-maroon-light'],
  ['hover:bg-green-800', 'hover:bg-mubito-maroon-light'],
  ['bg-green-200', 'bg-mubito-navy-light bg-opacity-20'],
  ['bg-green-100', 'bg-gray-100'],
  ['text-green-700', 'text-mubito-navy'],
  ['text-green-800', 'text-mubito-navy'],
  ['text-green-900', 'text-mubito-navy-dark'],
  ['text-green-200', 'text-gray-200'],
  ['border-green-300', 'border-mubito-maroon'],
  ['border-green', 'border-mubito-maroon']
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  console.log(`Processing ${file}...`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    replacements.forEach(([oldVal, newVal]) => {
      const regex = new RegExp(oldVal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      content = content.replace(regex, newVal);
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated ${file}`);
  } catch (error) {
    console.error(`✗ Error processing ${file}:`, error.message);
  }
});

console.log('Color replacement complete!');
