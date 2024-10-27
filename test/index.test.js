process.env.NODE_ENV = "test";

const os = require("node:os");
const path = require("node:path");
const { fileMetadata } = require("../dist/index.js");

jest.mock("node:os", () => ({
  platform: jest.fn(),
}));

jest.mock("../dist/platforms/macos", () => ({
  getMacOSMetadata: jest.fn(),
}));

jest.mock("../dist/platforms/linux", () => ({
  getLinuxMetadata: jest.fn(),
}));

jest.mock("../dist/platforms/windows", () => ({
  getWindowsMetadata: jest.fn(),
}));

describe("fileMetadata", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call macOS metadata function on macOS platform", async () => {
    os.platform.mockReturnValue("darwin");
    const { getMacOSMetadata } = require("../dist/platforms/macos");
    getMacOSMetadata.mockResolvedValue({ name: "test-file" });

    const result = await fileMetadata("test.txt");
    expect(getMacOSMetadata).toHaveBeenCalledWith(
      expect.stringContaining("test.txt")
    );
    expect(result).toEqual({ name: "test-file" });
  });

  test("should call Linux metadata function on Linux platform", async () => {
    os.platform.mockReturnValue("linux");
    const { getLinuxMetadata } = require("../dist/platforms/linux");
    getLinuxMetadata.mockResolvedValue({ name: "test-file" });

    const result = await fileMetadata("test.txt");
    expect(getLinuxMetadata).toHaveBeenCalledWith(
      expect.stringContaining("test.txt")
    );
    expect(result).toEqual({ name: "test-file" });
  });

  test("should call Windows metadata function on Windows platform", async () => {
    os.platform.mockReturnValue("win32");
    const { getWindowsMetadata } = require("../dist/platforms/windows");
    getWindowsMetadata.mockResolvedValue({ name: "test-file" });

    const result = await fileMetadata("test.txt");
    expect(getWindowsMetadata).toHaveBeenCalledWith(
      expect.stringContaining("test.txt")
    );
    expect(result).toEqual({ name: "test-file" });
  });

  test("should throw error for unsupported platform", async () => {
    os.platform.mockReturnValue("freebsd");

    await expect(fileMetadata("test.txt")).rejects.toThrow(
      "Unsupported platform: freebsd"
    );
  });

  test("should handle relative paths correctly", async () => {
    os.platform.mockReturnValue("linux");
    const { getLinuxMetadata } = require("../dist/platforms/linux");
    getLinuxMetadata.mockResolvedValue({ name: "test-file" });

    const relativePath = "./test.txt";
    await fileMetadata(relativePath);

    expect(getLinuxMetadata).toHaveBeenCalledWith(
      expect.stringContaining(path.basename(relativePath))
    );
  });
});
