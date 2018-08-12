import CharacterSet from "./CharacterSet";

it("#list", () => {
  const all = CharacterSet.list();
  expect(all.length).toBe(5);
  expect(all[0].name).toBe("ㄱㄲㅋ");
  expect(all[0].characters.length).toBe(12);
  expect(all[0].characters[0].name).toBe("겁");
});
