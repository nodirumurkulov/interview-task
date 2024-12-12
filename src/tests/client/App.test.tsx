import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import App from "components/App";
import { mockData } from "../mockData";

const server = setupServer(
  http.get("/api/data", () => {
    return HttpResponse.json(mockData);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("<App />", () => {
  it("renders the Service Desk Dashboard header", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(getByText(/Service Desk Dashboard/i)).toBeInTheDocument();
  });

  it("renders Issues List by default", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByText(/Issues List/i)).toBeInTheDocument();
    });
  });

  it("navigates to Data Insights when Data Insights link is clicked", async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/data"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByText(/Data Insights/i)).toBeInTheDocument();
    });
  });

  it("renders the navigation links correctly", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const issuesListLink = getByText(/Issues List/i);
    const dataInsightsLink = getByText(/Data Insights/i);

    await waitFor(() => {
      expect(issuesListLink).toBeInTheDocument();
      expect(dataInsightsLink).toBeInTheDocument();
    });
  });

  it("fetches and displays data correctly", async () => {
    const { getByText, container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(getByText("loading data...")).toBeInTheDocument();
    await waitFor(() => expect(container).toHaveTextContent("results"));
  });
});
