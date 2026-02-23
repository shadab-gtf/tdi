try {
  require('zod');
  require('react-hook-form');
  require('@hookform/resolvers/zod');
  require('clsx');
  require('tailwind-merge');
  console.log('All dependencies validation: SUCCESS');
} catch (e) {
  console.error('Dependency check failed:', e.message);
  process.exit(1);
}
