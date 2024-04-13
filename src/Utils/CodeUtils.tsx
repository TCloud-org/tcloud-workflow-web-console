export type Language =
  | "json"
  | "java"
  | "xml"
  | "javascript"
  | "bash"
  | undefined;

export interface CodeSnippet {
  snippet: string;
  language: Language;
}

export const generateCodeSnippets = (
  apiEndpoint: string,
  requestBody: object
): { [key: string]: CodeSnippet } => {
  const curlSnippet = `curl -X POST \\
     -H "Content-Type: application/json" \\
     -d '${JSON.stringify(requestBody)}' \\
      ${apiEndpoint}`;

  const javaSnippet = `import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

public class TriggerEmailNotificationWorkflow {
    public static void main(String[] args) {
        try {
            String apiEndpoint = "${apiEndpoint}";
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            String requestBody = "${JSON.stringify(requestBody)}";

            HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
            String response = restTemplate.exchange(apiEndpoint, HttpMethod.POST, requestEntity, String.class).getBody();

            System.out.println("Response: " + response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}`;

  const nodeJsSnippet = `const axios = require('axios');
  
axios.post('${apiEndpoint}', ${JSON.stringify(requestBody)})
.then(function (response) {
console.log('Response:', response.status);
})
.catch(function (error) {
console.error('Error:', error.message);
});`;

  return {
    curl: { snippet: curlSnippet, language: "bash" },
    java: { snippet: javaSnippet, language: "java" },
    node: { snippet: nodeJsSnippet, language: "javascript" },
  };
};

export const generateModelCodeSnippets = (
  object: object
): { [key: string]: CodeSnippet } => {
  return {
    json: {
      snippet: JSON.stringify(object, null, 2),
      language: "json",
    },
    java: {
      snippet: generateJavaCode(object),
      language: "java",
    },
    node: {
      snippet: generateNodeJsCode(object),
      language: "javascript",
    },
  };
};

const generateJavaCode = (obj: any) => {
  let javaCode = "public class MyClass {\n";
  javaCode += generateJavaFields(obj);
  javaCode += "}\n";
  return javaCode;
};

const generateJavaFields = (obj: any) => {
  let fields = "";
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      fields += `  private ${key}: ${generateJavaNestedClass(obj[key])};\n`;
    } else if (Array.isArray(obj[key])) {
      fields += `  private List<${typeof obj[key][0]}> ${key};\n`;
    } else {
      fields += `  private ${typeof obj[key]} ${key};\n`;
    }
  }
  return fields;
};

const generateJavaNestedClass = (nestedObj: any) => {
  let nestedClass = "class {\n";
  nestedClass += generateJavaFields(nestedObj);
  nestedClass += "}";
  return nestedClass;
};

const generateNodeJsCode = (obj: any) => {
  let nodeJsCode = "const myObject = {\n";
  nodeJsCode += generateNodeJsFields(obj);
  nodeJsCode += "};\n";
  return nodeJsCode;
};

const generateNodeJsFields = (obj: any) => {
  let fields = "";
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      fields += `  ${key}: {\n${generateNodeJsFields(obj[key])}  },\n`;
    } else {
      fields += `  ${key}: ${JSON.stringify(obj[key])},\n`;
    }
  }
  return fields;
};

export const generateJsonSchema = (obj: any) => {
  return JSON.stringify(generateJsonSchemaFields(obj), null, 2);
};

const generateJsonSchemaFields = (obj: any) => {
  const properties: any = {};
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      properties[key] = { ...generateJsonSchemaFields(obj[key]) };
    } else {
      properties[key] = { type: typeof obj[key] };
    }
  }
  return { type: "object", properties };
};
