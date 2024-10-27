const { fileMetadata } = require("../dist/index.js");

(async () => {
  const result = await fileMetadata("test.txt");
  console.log(result);
})();

