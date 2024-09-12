const { exec } = require("child_process");

describe("translator.js script", () => {
  it("English to Braile", (done) => {
    exec("node translator.js Hello world", (error, stdout, stderr) => {
      expect(error).toBeNull();
      expect(stderr).toBe("");
      expect(stdout.trim()).toBe(
        ".....OO.OO..O..O..O.O.O.O.O.O.O..OO........OOO.OO..OO.O.OOO.O.O.O.OO.O.."
      );
      done();
    });
    exec("node translator.js Abc 123 xYz", (error, stdout, stderr) => {
      expect(error).toBeNull();
      expect(stderr).toBe("");
      expect(stdout.trim()).toBe(
        ".....OO.....O.O...OO...........O.OOOO.....O.O...OO..........OO..OO.....OOO.OOOO..OOO"
      );
      done();
    });
  });

  it("Braile to English", (done) => {
    exec(
      "node translator.js .....OO.OO..O..O..O.O.O.O.O.O.O..OO........OOO.OO..OO.O.OOO.O.O.O.OO.O..",
      (error, stdout, stderr) => {
        expect(error).toBeNull();
        expect(stderr).toBe("");
        expect(stdout.trim()).toBe("Hello world");
        done();
      }
    );
    exec(
      "node translator.js .....OO.....O.O...OO...........O.OOOO.....O.O...OO..........OO..OO.....OOO.OOOO..OOO",
      (error, stdout, stderr) => {
        expect(error).toBeNull();
        expect(stderr).toBe("");
        expect(stdout.trim()).toBe("Abc 123 xYz");
        done();
      }
    );
  });

  it("All Letters E2B and B2E", (done) => {
    exec(
      "node translator.js abcdefghijklmnopqrstuvwxyz",
      (error, stdout, stderr) => {
        expect(error).toBeNull();
        expect(stderr).toBe("");
        expect(stdout.trim()).toBe(
          "O.....O.O...OO....OO.O..O..O..OOO...OOOO..O.OO...OO....OOO..O...O.O.O.O.OO..O.OO.OO.O..OO.OOO.O.OOOOO.O.OOO..OO.O..OOOO.O...OOO.O.OO.OOO.OOO..OOOO.OOOO..OOO"
        );
        done();
      }
    );
    exec(
      "node translator.js O.....O.O...OO....OO.O..O..O..OOO...OOOO..O.OO...OO....OOO..O...O.O.O.O.OO..O.OO.OO.O..OO.OOO.O.OOOOO.O.OOO..OO.O..OOOO.O...OOO.O.OO.OOO.OOO..OOOO.OOOO..OOO",
      (error, stdout, stderr) => {
        expect(error).toBeNull();
        expect(stderr).toBe("");
        expect(stdout.trim()).toBe("abcdefghijklmnopqrstuvwxyz");
        done();
      }
    );
  });

  it("All Numbers E2B and B2E", (done) => {
    exec("node translator.js 1234567890", (error, stdout, stderr) => {
      expect(error).toBeNull();
      expect(stderr).toBe("");
      expect(stdout.trim()).toBe(
        ".O.OOOO.....O.O...OO....OO.O..O..O..OOO...OOOO..O.OO...OO....OOO.."
      );
      done();
    });
    exec(
      "node translator.js .O.OOOO.....O.O...OO....OO.O..O..O..OOO...OOOO..O.OO...OO....OOO..",
      (error, stdout, stderr) => {
        expect(error).toBeNull();
        expect(stderr).toBe("");
        expect(stdout.trim()).toBe("1234567890");
        done();
      }
    );
  });
  it("Edge Cases", (done) => {
    exec("node translator.js 12 A", (error, stdout, stderr) => {
      expect(error).toBeNull();
      expect(stderr).toBe("");
      expect(stdout.trim()).toBe(".O.OOOO.....O.O..............OO.....");
      done();
    });
    exec(
      "node translator.js .O.OOOO.....O.O..............OO.....",
      (error, stdout, stderr) => {
        expect(error).toBeNull();
        expect(stderr).toBe("");
        expect(stdout.trim()).toBe("12 A");
        done();
      }
    );

    exec("node translator.js A 12", (error, stdout, stderr) => {
      expect(error).toBeNull();
      expect(stderr).toBe("");
      expect(stdout.trim()).toBe(".....OO............O.OOOO.....O.O...");
      done();
    });
    exec(
      "node translator.js .....OO............O.OOOO.....O.O...",
      (error, stdout, stderr) => {
        expect(error).toBeNull();
        expect(stderr).toBe("");
        expect(stdout.trim()).toBe("A 12");
        done();
      }
    );
  });
});
