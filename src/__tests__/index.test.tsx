import { NativeModules } from "react-native";
import LinkIO from "../index";

describe("LinkIO", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("configure", () => {
    it("should call native configure with correct config", () => {
      const config = {
        domain: "example.com",
        backendURL: "https://api.example.com",
        autoCheckPendingLinks: true,
      };

      LinkIO.configure(config);

      expect(NativeModules.LinkIO.configure).toHaveBeenCalledWith(config);
    });
  });

  describe("setDeepLinkListener", () => {
    it("should set deep link listener callback", () => {
      const mockListener = jest.fn();
      LinkIO.setDeepLinkListener(mockListener);

      expect(mockListener).not.toHaveBeenCalled();
    });
  });

  describe("trackReferral", () => {
    it("should call native trackReferral with required params", async () => {
      await LinkIO.trackReferral("REF123", "user456");

      expect(NativeModules.LinkIO.trackReferral).toHaveBeenCalledWith(
        "REF123",
        "user456",
        {},
      );
    });

    it("should call native trackReferral with metadata", async () => {
      const metadata = { source: "app", campaign: "summer" };
      await LinkIO.trackReferral("REF123", "user456", metadata);

      expect(NativeModules.LinkIO.trackReferral).toHaveBeenCalledWith(
        "REF123",
        "user456",
        metadata,
      );
    });
  });

  describe("checkPendingLink", () => {
    it("should call native checkPendingLink", async () => {
      await LinkIO.checkPendingLink();

      expect(NativeModules.LinkIO.checkPendingLink).toHaveBeenCalled();
    });
  });

  describe("handleURL", () => {
    it("should call native handleURL with url string", () => {
      const url = "https://example.com/ref/ABC123";
      LinkIO.handleURL(url);

      expect(NativeModules.LinkIO.handleURL).toHaveBeenCalledWith(url);
    });
  });

  describe("cleanup", () => {
    it("should call cleanup without errors", () => {
      const config = {
        domain: "example.com",
        backendURL: "https://api.example.com",
      };

      LinkIO.configure(config);

      expect(() => {
        LinkIO.cleanup();
      }).not.toThrow();
    });
  });
});
