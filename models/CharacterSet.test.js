import CharacterSet from "./CharacterSet";

it("#list", () => {
  const all = CharacterSet.list();
  expect(all.length).toBe(5);
  expect(all[0].name).toBe("ㄱㄲㅋ");
  expect(all[0].groups.length).toBe(4);
  expect(all[0].groups[0].length).toBe(3);
  expect(all[0].groups[0][0].name).toBe("겁");
});

it("#charsWithGroups", () => {
  const charAndUniverse = CharacterSet.list()[0].charsWithGroups()[0];
  expect(charAndUniverse.length).toBe(2);
  expect(charAndUniverse[0].name).toBe("겁");
  expect(charAndUniverse[1].length).toBe(3);
  expect(charAndUniverse[1][0].name).toBe("겁");
  expect(charAndUniverse[1][1].name).toBe("껍");
  expect(charAndUniverse[1][2].name).toBe("컵");
});
