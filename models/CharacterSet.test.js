import CharacterSet from "./CharacterSet";

it("#all", () => {
  const all = CharacterSet.all();
  expect(all.length).toBe(2);
  expect(all[0].name).toBe("ㄱㄲㅋ");
  expect(all[0].characters.length).toBe(3);
  expect(all[0].characters[0].name).toBe("기");
  expect(all[0].characters[0].voices.default).toBeTruthy();
});

it("#find", () => {
  expect(CharacterSet.find("ㄱㄲㅋ").name).toBe("ㄱㄲㅋ");
  expect(CharacterSet.find("unknown")).toBeFalsy();
});
