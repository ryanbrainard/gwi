import CharacterSet from "./CharacterSet";

it("#list", () => {
  const all = CharacterSet.list();
  expect(all.length).toBe(5);
  expect(all[0].name).toBe("ㄱㄲㅋ");
  expect(all[0].groups.length).toBe(4);
  expect(all[0].groups[0].length).toBe(3);
  expect(all[0].groups[0][0].name).toBe("겁");
});

it("#groups", () => {
  const group = CharacterSet.list()[0].groups[0];
  expect(group.length).toBe(3);
  expect(group[0].name).toBe("겁");
  expect(group[1].name).toBe("껍");
  expect(group[2].name).toBe("컵");
});

it("#characters", () => {
  const char = CharacterSet.list()[0].characters[0];
  expect(char.name).toBe("겁");
  expect(char.group.length).toBe(3);
  expect(char.group[0].name).toBe("겁");
  expect(char.group[1].name).toBe("껍");
  expect(char.group[2].name).toBe("컵");
});
