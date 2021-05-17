import {
  CameraIcon,
  EmojiHappyIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { useRef, useState } from "react";
import { db, storage } from "../firebase";
import firebase from "firebase";
const InputBox = () => {
  const [session] = useSession();
  const inputRef = useRef(null);
  const filePicker = useRef(null);
  const [imageToPost, setimageToPost] = useState(null);
  const sendPost = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;

    db.collection("posts")
      .add({
        message: inputRef.current.value,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(), //firebase.firestore.FieldValue.serverTimeStamp(),
      })
      .then((doc) => {
        inputRef.current.value = "";
        if (imageToPost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imageToPost, "data_url");
          uploadTask.on(
            "state_change",
            null,
            (error) => console.log("eroor uploading image", error),
            () => {
              console.log("Upload completed");
              storage
                .ref("posts")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection("posts").doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
          removeImage();
        }
      });
  };

  const handleImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setimageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setimageToPost(null);
  };
  return (
    <div className="bg-white p-2 rounded-2xl shadow-md mt-5 text-gray-500 font-medium">
      <div className="flex p-4 space-x-4 items-center">
        <Image
          className="rounded-full cursor-pointer "
          layout="fixed"
          width={40}
          height={40}
          src={session.user.image}
        />
        <form className="flex flex-1">
          <input
            className="rounded-full h-12 px-5 bg-gray-100 flex-grow outline-none"
            type="text"
            ref={inputRef}
            placeholder={`what is on your mind?. ${session.user.name}`}
          />
          <button
            type="submit"
            className="bg-blue-500 mx-2 h-8 mt-2 text-white px-2 outline-none active:outline-none focus:outline-none rounded-lg"
            onClick={sendPost}
          >
            Post
          </button>
        </form>
      </div>
      <div className="flex items-center justify-center ">
        {imageToPost && (
          <div
            onClick={removeImage}
            className=" py-2 flex flex-col filter hover:brightness-110 transition duration-150 transform scale-105 cursor-pointer"
          >
            <img src={imageToPost} alt="" className=" object-contain p-1" />
            <p className="p-3 text-xs text-center text-red-300">Remove</p>
          </div>
        )}
      </div>
      <div className="flex justify-evenly p-3 border-t">
        <div className="input-icon">
          <VideoCameraIcon className="text-red-500 h-7 " />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div onClick={() => filePicker.current.click()} className="input-icon">
          <CameraIcon className="text-green-400 h-7 " />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input ref={filePicker} type="file" hidden onChange={handleImage} />
        </div>
        <div className="input-icon">
          <EmojiHappyIcon className="text-yellow-400 h-7 " />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
