import axios from "axios";
import { Request, Response } from "express";
import { SampleData } from "./types";

const DATA_URL =
  "https://sampleapi.squaredup.com/integrations/v1/service-desk?datapoints=30";

export const GET = async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get<SampleData>(DATA_URL);

    res.status(200).send(data);
  } catch (error) {
    console.error("Error fetching data from API:", error);

    res.status(500).json({
      error: "Failed to fetch data from the API. Please try again later.",
    });
  }
};
