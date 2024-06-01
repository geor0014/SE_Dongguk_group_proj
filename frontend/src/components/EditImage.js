import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function EditImage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [keywords, setKeywords] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      const res = await authService.getSingleImage(id);
      setImage(res.data.image);
      setDescription(res.data.image.description);
      setKeywords(res.data.image.keywords);
    };
    fetchImage();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!description || !keywords) {
      alert("Description and keywords are required");
      return;
    }
    const trimmedDescription = description.trim();
    const trimmedKeywords = keywords.trim();
    const res = await authService.updateImage(
      id,
      trimmedDescription,
      trimmedKeywords
    );
    if (res.status === 200) {
      navigate("/userImageList");
    }
  };

  return (
    <>
      {image && (
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-[550px]">
            <h1 className="mb-5 text-2xl font-semibold text-[#07074D]">
              Edit Image Information
            </h1>
            <form onSubmit={handleEdit}>
              <div className="mb-5">
                <label
                  htmlFor="description"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Description
                </label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="keywords"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Keywords
                </label>
                <input
                  type="text"
                  name="keywords"
                  id="keywords"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="Keywords"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div>
                <button className="hover:shadow-form mx-2 rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                  Update
                </button>

                <button
                  className="hover:shadow-form rounded-md bg-yellow-200 py-3 px-8 text-base font-semibold text-white outline-none"
                  onClick={() => navigate("/userImageList")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

<>
  <div class="flex items-center justify-center p-12">
    <div class="mx-auto w-full max-w-[550px]">
      <form action="https://formbold.com/s/FORM_ID" method="POST">
        <div class="mb-5">
          <label
            for="name"
            class="mb-3 block text-base font-medium text-[#07074D]"
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label
            for="email"
            class="mb-3 block text-base font-medium text-[#07074D]"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@domain.com"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label
            for="subject"
            class="mb-3 block text-base font-medium text-[#07074D]"
          >
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Enter your subject"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label
            for="message"
            class="mb-3 block text-base font-medium text-[#07074D]"
          >
            Message
          </label>
          <textarea
            rows="4"
            name="message"
            id="message"
            placeholder="Type your message"
            class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          ></textarea>
        </div>
        <div>
          <button class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</>;
