import axios from "axios";
import { WOS_PARSE_XML_FOR_VISUALIZATION_ENDPOINT } from "../Config/WOSEndpointConfig";
import { ParseXMLForVisualizationOutput } from "../Config/WorkflowConfig";

export const getGraphVisualization = async (
  xml: string,
  token: string
): Promise<ParseXMLForVisualizationOutput> => {
  return await axios
    .post(
      WOS_PARSE_XML_FOR_VISUALIZATION_ENDPOINT,
      { xml },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data as ParseXMLForVisualizationOutput);
};
