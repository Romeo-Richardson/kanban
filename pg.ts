const newArray: (string | number)[] = [1, "2", 3];

const newFunc = (param: string, param2?: string): number => {
  const whatever = param2;
  return 3;
};

interface newInt {
  name: string;
  id: number;
  posts: string[];
}

interface student {
  name: string;
  teacher: string;
  classes: string[];
}

interface apstudent extends student {
  extra: string;
}

interface newIntAdmin<T, B> extends newInt {
  students?: apstudent[];
  subject: T;
  style: B;
}

const teacher: newIntAdmin<number, string> = {
  name: "Romeo",
  id: 1,
  posts: ["string"],
  students: [
    { name: "rick", teacher: "Romeo", classes: ["AP English"], extra: "PE" },
  ],
  subject: 3,
  style: "String",
};

type custom = "Hello" | "Bye";

const newString: custom = "Bye";

console.log(newString);

const newerString: Exclude<custom, "Hello"> = "Bye";

type newType = Exclude<custom, "Bye">;

const newestString: newType = "Hello";
