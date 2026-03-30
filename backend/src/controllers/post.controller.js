import id3 from "node-id3";

export const createPost = async (req, res) => {
  const { caption } = req.body;
  const file = req.file; //file k andar hi file ka data milenga

  //   const fileData = id3.read(file.buffer); //use

  console.log(caption, "file uploaded", file);

  res.status(201).json({
    message: "post created successfully",
  });
};
