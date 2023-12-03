import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Styles } from "../style";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../HOC";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  //Email js Template id     template_ub0snyi
  // service id              service_2cs3vxy
  // public key              5Mpct5l-ydoB2QvPY

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    //emailjs.send(serviceId, templateId, templateParams,publicKey)
    emailjs
      .send(
        "service_2cs3vxy",
        "template_ub0snyi",
        {
          from_name: "Rahul",
          to_name: "Avishekh",
          from_email: form.email,
          to_email: "j.avishekh2021@gmail.com",
          message: form.message,
        },
        "5Mpct5l-ydoB2QvPY"
      )
      .then((result) => {
        setLoading(false);
        setForm({
          name: "",
          email: "",
          message: "",
        });
      })
      .then((error) => {
        setLoading(false);
        alert("Something went wrong!");
      });
  };
  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={Styles.sectionSubText}>Get in Touch</p>
        <h3 className={Styles.sectionHeadText}>Contact.</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name"
              className="bg-tertiary py-4 px-6 text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email"
              className="bg-tertiary py-4 px-4 text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What's your message"
              className="bg-tertiary px-4 py-4  text-white rounded-lg outlined-none border-none font-medium placeholder:text-secondary"
            />
          </label>

          <button
            type="sumbit"
            onClick={handleSubmit}
            className="bg-tertiary py-3 px-3 outlined-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
          >
            {loading ? "Sending" : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
