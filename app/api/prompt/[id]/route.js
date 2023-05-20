import Prompt from "@/models/promptModel";
import connectDB from "@/utils/database";

//GET
export const GET = async (req, { params }) => {
  try {
    await connectDB();

    const prompt = await Prompt.findById({ _id: params.id }).populate(
      "creator"
    );
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch the prompt", { status: 500 });
  }
};

//PATCH
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectDB();

    const existingPrompt = await Prompt.findById({ _id: params.id });
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    const updatedPrompt = await Prompt.findByIdAndUpdate(
      { _id: existingPrompt._id },
      {
        prompt,
        tag,
      },
      {
        new: true,
      }
    );

    return new Response(JSON.stringify(updatedPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

//DELETE
export const DELETE = async (req, { params }) => {
  try {
    await connectDB();

    await Prompt.findByIdAndDelete({ _id: params.id });

    return new Response("Successfully deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete the prompt", { status: 500 });
  }
};
