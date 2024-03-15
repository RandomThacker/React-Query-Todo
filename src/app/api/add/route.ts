// import { NextResponse, NextRequest } from "next/server";
// // import Api from "anydo-api";

// export async function GET(req: NextRequest, res: NextResponse) {
//   try {
//     const tasks = [
//       { title: "from api today" },
//       { title: "from api tomorrow", dueDate: "tomorrow" },
//       { title: "from api upcoming", dueDate: "upcoming" },
//       { title: "from api someday", dueDate: null },
//       { title: "from api to category", categoryId: "yourCategoryId" },
//     ];
//     const api = new Api(process.env.EMAIL, process.env.PASSWORD);

//     api
//       .addTasks(tasks)
//       .then(() => api.sync())
//       .then((res) => {
//           console.log("res")
//         console.log(res)
//       });

//     return NextResponse.json("hello world");
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.error();
//   }
// }
