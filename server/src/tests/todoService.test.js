import { describe, it, expect, beforeEach } from "vitest";
import { todoService } from "../services/todoService.js";

describe("todoService", () => {
  describe("getStatistics", () => {
    it("should return statistics with correct structure", () => {
      const stats = todoService.getStatistics();

      expect(stats).toHaveProperty("total");
      expect(stats).toHaveProperty("statsCount");
      expect(stats).toHaveProperty("completionPercentage");

      expect(stats.statsCount).toHaveProperty("todo");
      expect(stats.statsCount).toHaveProperty("done");
    });

    it("should return total as a number", () => {
      const stats = todoService.getStatistics();
      expect(typeof stats.total).toBe("number");
      expect(stats.total).toBeGreaterThanOrEqual(0);
    });

    it("should return completionPercentage as a number", () => {
      const stats = todoService.getStatistics();
      expect(typeof stats.completionPercentage).toBe("number");
      expect(stats.completionPercentage).toBeGreaterThanOrEqual(0);
      expect(stats.completionPercentage).toBeLessThanOrEqual(100);
    });

    it("should calculate total correctly", () => {
      const stats = todoService.getStatistics();
      const todoCount = stats.statsCount.todo || 0;
      const doneCount = stats.statsCount.done || 0;
      const otherStatuses = Object.keys(stats.statsCount)
        .filter((key) => key !== "todo" && key !== "done")
        .reduce((sum, key) => sum + (stats.statsCount[key] || 0), 0);

      expect(stats.total).toBe(todoCount + doneCount + otherStatuses);
    });
  });
});
