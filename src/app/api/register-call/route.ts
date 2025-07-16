import { logger } from "@/lib/logger";
import { InterviewerService } from "@/services/interviewers.service";
import { NextResponse } from "next/server";
import Retell from "retell-sdk";

const retellClient = new Retell({
  apiKey: process.env.RETELL_API_KEY || "",
});

export async function POST(req: Request, res: Response) {
  logger.info("register-call request received");

  const body = await req.json();

  let interviewerId = body.interviewer_id;
  // Ensure interviewerId is a number
  if (typeof interviewerId === "string") {
    interviewerId = parseInt(interviewerId, 10);
  }

  const interviewer = await InterviewerService.getInterviewer(interviewerId);

  console.log("Interviewer details:", interviewer);
  console.log("agent_id:", interviewer?.agent_id);
  console.log("dynamic_data:", body.dynamic_data);

  if (!interviewer || !interviewer.agent_id) {
    logger.error("Interviewer not found or missing agent_id", interviewer);
    return NextResponse.json(
      { error: "Interviewer not found or missing agent_id" },
      { status: 404 },
    );
  }

  try {
    const registerCallResponse = await retellClient.call.createWebCall({
      agent_id: interviewer.agent_id,
      retell_llm_dynamic_variables: body.dynamic_data,
    });

    logger.info("Call registered successfully");

    return NextResponse.json(
      {
        registerCallResponse,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    logger.error(
      "Error registering call:",
      typeof error === "string" ? error : JSON.stringify(error)
    );
    let errorMessage = "";
    if (error && typeof error === "object" && "message" in error) {
      errorMessage = (error as { message: string }).message;
    } else {
      errorMessage = String(error);
    }
    return NextResponse.json(
      { error: "Failed to register call", details: errorMessage },
      { status: 500 },
    );
  }
}
