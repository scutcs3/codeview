import { CV_API } from "@/global";
import mockjs from "mockjs";
const Random = mockjs.Random;

mockjs.mock(CV_API + "/problems", () => {
  const list = [];
  for (let i = 0; i < 30; i++) {
    list.push({
      title: Random.ctitle(),
      content: Random.cparagraph(),
      id: i + 1,
      owner_id: 0,
      created_at: Random.datetime("yyyy-MM-dd HH:mm:ss"),
      updated_at: Random.datetime("yyyy-MM-dd HH:mm:ss"),
    });
  }
  return JSON.stringify(list);
});
