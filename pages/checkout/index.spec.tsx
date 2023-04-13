import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Checkout from "./index.page";
import { comicMock } from "dh-marvel/test/mocks/comic";
import { getServerSideProps } from "../index.page";
import { GetServerSidePropsContext } from "next/types";
import { ParsedUrlQuery } from "node:querystring";

describe("ComicIDPage", () => {
  describe("when rendering default page", () => {
    it("should fetch the data", async () => {
      render(
          <Checkout comic={comicMock} />
      );
      const title = screen.getByText("Marvel Previews (2017)");
      expect(title).toBeInTheDocument();
    });
  });
});
