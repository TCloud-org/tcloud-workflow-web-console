import { ProfileFilled, SmileOutlined } from "@ant-design/icons";
import { EditableColumn } from "Config/LayoutConfig";
import { WOS_INITIATE_TCA_WORKFLOW_ENDPOINT } from "Config/WOSEndpointConfig";
import { AppEndpointDoc } from "DataDisplayComponents/AppEndpointDoc";
import {
  AppHeadingLink,
  scrollToHash,
} from "DataDisplayComponents/AppHeadingLink";
import { AppNextActionCard } from "DataDisplayComponents/AppNextActionCard";
import { AppTable } from "DataDisplayComponents/AppTable";
import { CodeWithToolbar } from "DataDisplayComponents/CodeWithToolbar";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppRow } from "LayoutComponents/AppRow";
import { AppSpace } from "LayoutComponents/AppSpace";
import { propertyColumns } from "WorkflowAutomationComponents/CodeTriggerSteps";
import { Col, Divider, Flex, Result, Segmented, Typography } from "antd";
import { useEffect, useState } from "react";

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

const requestBodyRows = [
  {
    property: "clientId",
    required: true,
    description: "An unique identifier of a client",
    type: "String",
  },
  {
    property: "workflowId",
    required: true,
    description: "An unique identifier of a workflow",
    type: "Long",
  },
  {
    property: "workId",
    required: false,
    description:
      "This field represents a unique identifier assigned to a work executed after triggering the workflow. If provided, it signifies the creation of a new version of the workflow.",
    type: "Long",
  },
  {
    property: "document",
    required: false,
    description:
      "This document serves as the initial input for the workflow and will be utilized throughout the entire workflow process. It provides the foundational data upon which subsequent actions and decisions are based.",
    type: "Document",
  },
  {
    property: "configuration",
    required: false,
    description:
      "This enables you to configure which version of a graph or service endpoint to execute for a particular state or the entire workflow.",
    type: "WorkflowConfiguration",
  },
];

const nextSteps = [
  {
    title: "Onboarding",
    description: "Check out our onboarding process to get started",
    icon: <ProfileFilled />,
    href: "/step-workflow-onboarding",
  },
];

const AddTokenRows = [
  {
    field: "Name",
    value: "ExampleAuthToken",
  },
  {
    field: "Client",
    value: "admin",
  },
  {
    field: "Associated service",
    value: "ExampleService",
  },
  {
    field: "Authentication type",
    value: "No Auth",
  },
];

const AddRetryRows = [
  {
    field: "Policy",
    value: "Exponential Backoff",
  },
  {
    field: "Name",
    value: "Example Exponential Backoff Retry Strategy",
  },
  {
    field: "Initial delay",
    value: "5",
  },
  {
    field: "Multiplier factor",
    value: "1",
  },
  {
    field: "Max retries",
    value: "20",
  },
  {
    field: "Max delay",
    value: "60",
  },
];

const AddServiceRows = [
  {
    field: "Client Id",
    value: "admin",
  },
  {
    field: "Service",
    value: "ExampleService",
  },
  {
    field: "Endpoint",
    value:
      "http://<YOUR_EC2_PUBLIC_DNS>:<PORT>/<REQUEST_MAPPING> (e.g., http://10.10.10.100:80/)",
  },
  {
    field: "Environment",
    value: "Development",
  },
  {
    field: "Alias",
    value: "live",
  },
];

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

  useEffect(() => {
    scrollToHash();
  }, []);

  return (
    <AppSpace>
      <PageTitle>Quickstart</PageTitle>
      <Typography.Text>
        Before getting started, choose the preferred programming language you
        want to work with
      </Typography.Text>
      <Segmented<string>
        options={["Java"]}
        onChange={setLanguage}
        value={language}
      />

      <Typography.Paragraph>
        If your server is already up and running, feel free to proceed to step
        2.
      </Typography.Paragraph>

      <AppHeadingLink level={3}>
        Step 1: Setting up the environment
      </AppHeadingLink>

      <AppHeadingLink level={4}>
        1.1. Initialize a Spring Boot project
      </AppHeadingLink>
      <Typography.Paragraph>
        <ol>
          <li>
            Go to <a href="https://start.spring.io">Spring Initializr</a>.
          </li>
          <li>
            Follow this{" "}
            <a href="https://spring.io/quickstart">Spring Quickstart Guide</a>{" "}
            to create a Spring Boot application or fill out as below:
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

      <AppHeadingLink level={4}>
        1.2. Add the required dependencies
      </AppHeadingLink>
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

      <AppHeadingLink level={4}>1.3. Set up your first API</AppHeadingLink>
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
          <li>
            Test by running your server locally with{" "}
            <code>mvn spring-boot:run</code> command
          </li>
        </ol>
      </Typography.Paragraph>

      <AppHeadingLink level={4}>1.4 Host your server</AppHeadingLink>
      <Typography.Paragraph>
        Feel free to select the hosting method that suits you best. In this
        tutorial, we'll explore how to utilize AWS EC2 for our demonstration.
      </Typography.Paragraph>

      <Typography.Paragraph>
        <ol>
          <li>
            Follow this{" "}
            <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html">
              Tutorial: Get started with Amazon EC2 Linux instances
            </a>{" "}
            from AWS to launch your EC2 instance where you will host your
            server.
          </li>
          <li>
            One of the optimal methods for deploying your Java application to
            EC2 is <a href="https://www.docker.com">Docker</a>. However, to
            maintain simplicity in this tutorial, we will employ the{" "}
            <a href="https://man.openbsd.org/scp.1">scp</a> command to
            seamlessly transfer your application from your local machine to a
            virtual machine, such as AWS EC2. By referring to the{" "}
            <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-linux-inst-ssh.html#linux-file-transfer-scp">
              Transfer files to Linux instances using an SCP client
            </a>{" "}
            documentation provided by AWS, you should be able to successfully
            transfer your java application to your EC2 instance.
          </li>
          <li>
            SSH to your EC2 instance and navigate to the root directory of your
            java application and simply run the application using the maven
            command: <code>mvn spring-boot:run</code>
          </li>
        </ol>
      </Typography.Paragraph>

      <AppHeadingLink level={3}>
        Step 2: Configure your service endpoints, retry strategies, and
        workflow.
      </AppHeadingLink>

      <AppHeadingLink level={4}>
        2.1 Add your service endpoint mapping
      </AppHeadingLink>
      <Typography.Paragraph>
        <ol>
          <li>
            Under <strong>Step Workflow</strong> menu, navigate to{" "}
            <strong>Service</strong> tab.
          </li>
          <li>
            Click <strong>Add a new service</strong>.
          </li>
          <li>
            Fill out the forms as below:
            <AppTable
              rows={AddServiceRows}
              columns={SpringCols}
              showTitle={false}
              showSettings={false}
              showSelected={false}
              style={{ marginTop: 16 }}
            />
          </li>
          <li>
            Click <strong>Add</strong>.
          </li>
        </ol>
      </Typography.Paragraph>

      <AppHeadingLink level={4}>2.2 Add your retry strategies</AppHeadingLink>
      <Typography.Paragraph>
        We will use an exponential backoff retry strategy as an example in this
        tutorial.
        <ol>
          <li>
            Under <strong>Step Workflow</strong> menu, navigate to{" "}
            <strong>Retry Policy</strong> tab.
          </li>
          <li>
            Click <strong>Add a new retry policy</strong>
          </li>
          <li>
            Fill out the forms as below:
            <AppTable
              rows={AddRetryRows}
              columns={SpringCols}
              showTitle={false}
              showSettings={false}
              showSelected={false}
              style={{ marginTop: 16 }}
            />
            This retry strategy includes an initial delay of 5 minutes for the
            first attempt, with a multiplier factor of 1, doubling the delay
            time with each subsequent attempt. It allows for a maximum of 20
            retries, with a maximum delay of 60 minutes, maintaining a flat
            delay time after reaching this threshold.
          </li>
          <li>
            Click <strong>Add</strong>.
          </li>
        </ol>
        When reviewing a retry policy, you'll find a simulator that displays the
        scheduled time for the next retry attempt.
      </Typography.Paragraph>

      <AppHeadingLink level={4}>2.3 Create your first workflow</AppHeadingLink>
      <Typography.Paragraph>
        Let's do a quick review of what you've completed up to this point.
        <ul style={{ listStyle: "outside" }}>
          <li>Your java server is up and running.</li>
          <li>
            You've configured an API with a POST request and the path
            "/first-api".
          </li>
          <li>
            You have set up a service endpoint mapping:{" "}
            <strong>ExampleService</strong>
          </li>
          <li>You have created a exponential backoff retry strategy.</li>
        </ul>
        Now, let's assembly them together in the workflow.
      </Typography.Paragraph>
      <Typography.Paragraph>
        Replace <code>{`<INSERT_YOUR_RETRY_POLICY_ID>`}</code> with the retry
        policy ID created in the previous step.
      </Typography.Paragraph>
      <CodeWithToolbar
        snippets={{
          xml: {
            snippet: `<?xml version="1.0" encoding="UTF-8"?>
<workflow initialState="InitialState" retryPolicyId="<INSERT_YOUR_RETRY_POLICY_ID>">
    <state name="InitialState" service="ExampleService" operation="first-api">
        <default goto="terminal"/>
    </state>
</workflow>`,
            language: "xml",
          },
        }}
      />
      <Typography.Paragraph>
        In this workflow, we can see that the initial state triggers the API
        "first-api" from ExampleService. As a result, we set the default result
        state to go to terminal which will conclude this workflow.
      </Typography.Paragraph>

      <Typography.Paragraph>
        <ol>
          <li>
            Now that you have a workflow graph ready, you can navigate to the{" "}
            <a href="step-workflow-onboarding">Onboarding</a> tab to create a
            new workflow and add the above graph with a <strong>live</strong>{" "}
            alias. Since you have created service endpoint mapping and retry
            policy ealier, you can simply skip these 2 steps during the
            onboarding process.
          </li>
          <li>
            Once completed, you should find your workflow name in the first
            dropdown menu located at the top right corner. If it appears there,
            select your workflow.
          </li>
        </ol>
      </Typography.Paragraph>

      <AppHeadingLink level={3}>
        Step 3: Add your service auth token
      </AppHeadingLink>
      <Typography.Paragraph>
        For our platform to process your API requests, authentication via an
        authentication token is required. Currently, we support two
        authentication methods: "NO AUTH" and "BEARER". Stay tuned for more
        options in the future.
      </Typography.Paragraph>
      <Typography.Paragraph>
        <ol>
          <li>
            Navigate to <a href="/authentication">Auth Token</a> tab under
            Security menu and click <a href="/authentication/add">Add token</a>.
          </li>
          <li>
            Fill out the forms as below and click <strong>Add</strong>:
            <AppTable
              rows={AddTokenRows}
              columns={SpringCols}
              showTitle={false}
              showSettings={false}
              showSelected={false}
              style={{ marginTop: 16 }}
            />
          </li>
        </ol>
        Since we haven't configured any authentication from the backend, we
        select "No Auth" for the authentication type.{" "}
      </Typography.Paragraph>

      <AppHeadingLink level={3}>Step 4: Trigger the workflow</AppHeadingLink>

      <AppHeadingLink level={4}>Endpoint</AppHeadingLink>

      <AppEndpointDoc
        endpoint={WOS_INITIATE_TCA_WORKFLOW_ENDPOINT}
        method="POST"
      />

      <Typography.Paragraph>
        Utilize the provided endpoint to seamlessly integrate it into your
        application for initiating workflows tailored to your business needs. To
        swiftly verify its functionality, execute the following CURL command to
        initiate a sample workflow.
      </Typography.Paragraph>

      <CodeWithToolbar
        snippets={{
          curl: {
            snippet: `curl -X POST \
https://wos.be.thecloudworlds.com:8080/api/private/v1/initiate-workflow \
\n     -H 'Content-Type: application/json' \
\n     -d '{
            "clientId": "admin",
            "workflowId": <INSERT_YOUR_WORKFLOW_ID>,
            "workId": null,
            "document": null,
            "configuration": null
        }'`,
            language: "bash",
          },
        }}
      />

      <AppHeadingLink level={4}>Request Body</AppHeadingLink>

      <AppTable
        rows={requestBodyRows}
        columns={propertyColumns}
        showTitle={false}
        showSettings={false}
        showSelected={false}
        style={{ marginTop: 16 }}
      />

      <Divider />

      <Result
        icon={<SmileOutlined />}
        title="Great, you have completed this tutorial!"
      />

      <Divider />

      <Flex align="center" vertical gap={32} style={{ marginBottom: "32px" }}>
        <Typography.Title level={5}>Next Steps</Typography.Title>
        <AppRow
          gutter={[16, 16]}
          style={{ width: "100%", justifyContent: "center" }}
        >
          {nextSteps.map((step, i) => (
            <Col span={8} key={i}>
              <AppNextActionCard {...step} />
            </Col>
          ))}
        </AppRow>
      </Flex>
    </AppSpace>
  );
};
