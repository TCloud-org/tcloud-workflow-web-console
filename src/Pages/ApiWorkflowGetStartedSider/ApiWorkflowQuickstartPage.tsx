import { EditableColumn } from "Config/LayoutConfig";
import { AppTable } from "DataDisplayComponents/AppTable";
import { CodeWithToolbar } from "DataDisplayComponents/CodeWithToolbar";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Segmented, Typography } from "antd";
import { useState } from "react";

const firstApiSnippet = `package com.example.demo.controller;

import com.tcloud.entity.WorkRequest;
import com.tcloud.entity.WorkResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class ExampleController {

    @PostMapping("/first-api")
    public ResponseEntity<WorkResponse> execute(@RequestBody final WorkRequest workRequest) {
        return ResponseEntity.ok().build();
    }
}`;

const SpringCols: EditableColumn[] = [
  {
    title: "Field",
    dataIndex: "field",
    width: "50%",
  },
  {
    title: "Value",
    dataIndex: "value",
    width: "50%",
  },
];

const SpringRows = [
  {
    field: "Project",
    value: "Maven",
  },
  {
    field: "Language",
    value: "Java",
  },
  {
    field: "Spring Boot",
    value: "3.2.5",
  },
  {
    field: "Packaging",
    value: "Jar",
  },
  {
    field: "Java",
    value: "17",
  },
  {
    field: "Dependencies",
    value: "Spring Web",
  },
];
export const ApiWorkflowQuickstartPage = () => {
  const [language, setLanguage] = useState<string>("Java");
  return (
    <AppSpace>
      <PageTitle>Quickstart</PageTitle>
      <Typography.Text>
        Before getting started, choose the preferred programming language you
        want to work with
      </Typography.Text>
      <Segmented<string>
        options={["Java", "Node.js"]}
        onChange={setLanguage}
        value={language}
      />

      <Typography.Title level={3}>
        1. Setting up the environment
      </Typography.Title>

      <Typography.Title level={4}>
        1.1. Initialize a Spring Boot project
      </Typography.Title>
      <Typography.Paragraph>
        <ol>
          <li>
            Go to <a href="https://start.spring.io">Spring Initializr</a>.
          </li>
          <li>
            Follow this <a href="https://spring.io/quickstart">tutorial</a> to
            create a Spring Boot application or fill out as below:
            <AppTable
              rows={SpringRows}
              columns={SpringCols}
              showTitle={false}
              showSettings={false}
              showSelected={false}
              style={{ marginTop: 16 }}
            />
          </li>
          <li>
            Click <strong>Generate</strong>.
          </li>
        </ol>
      </Typography.Paragraph>

      <Typography.Title level={4}>
        1.2. Add the required dependencies
      </Typography.Title>
      <Typography.Paragraph>
        <ol>
          <li>
            Open the Spring Boot project that you created in the previous step.
          </li>
          <li>
            Open <strong>pom.xml</strong> file and add the below dependencies:
            <p>
              <CodeWithToolbar
                snippets={{
                  xml: {
                    snippet: `<dependency>
    <groupId>com.tcloud</groupId>
    <artifactId>tca-workflow-entity</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>`,
                    language: "xml",
                  },
                }}
              />
            </p>
          </li>
          <li>
            Reload the project by right-clicking on the <strong>pom.xml</strong>
            , then selecting <strong>Maven</strong> and choosing{" "}
            <strong>Reload project</strong>.
          </li>
        </ol>
      </Typography.Paragraph>

      <Typography.Title level={4}>1.3. Set up your first API</Typography.Title>
      <Typography.Paragraph>
        This step will guide you through setting up the standard infrastructure
        for your API, which can seamlessly integrate into your workflow.{" "}
      </Typography.Paragraph>

      <Typography.Paragraph>
        <ol>
          <li>
            Create an <strong>ExampleController.java</strong> file under{" "}
            <strong>src/main/java/com/example/demo/controller</strong>.
          </li>
          <li>
            Copy and paste from the below code.
            <p>
              <CodeWithToolbar
                snippets={{
                  java: {
                    snippet: firstApiSnippet,
                    language: "java",
                  },
                }}
              />
            </p>
          </li>
        </ol>
      </Typography.Paragraph>
    </AppSpace>
  );
};
