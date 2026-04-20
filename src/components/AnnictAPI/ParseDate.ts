export function parseDate(input: string): string {
  const today = new Date();
  let year = today.getFullYear();
  let season: string = '';

  // 年の計算
  const beforeYearMatch = input.match(/(\d+)年前/);
  const afterYearMatch = input.match(/(\d+)年後/);
  const nextYearMatch = input.match(/来年/);
  const specificYearMatch = input.match(/(\d{4})年/);

  if (beforeYearMatch) {
    year -= parseInt(beforeYearMatch[1], 10);
  } else if (afterYearMatch) {
    year += parseInt(afterYearMatch[1], 10);
  } else if (nextYearMatch) {
    year += 1;
  } else if (specificYearMatch) {
    year = parseInt(specificYearMatch[1], 10);
  }

  // 季節の変換
  if (input.includes('春')) {
    season = 'spring';
  } else if (input.includes('夏')) {
    season = 'summer';
  } else if (input.includes('秋')) {
    season = 'fall';
  } else if (input.includes('冬')) {
    season = 'winter';
  } else {
    const month = today.getMonth() + 1;
    if (month === 1 || month === 2 || month === 3) {
      season = 'winter';
    } else if (month === 4 || month === 5 || month === 6) {
      season = 'spring';
    } else if (month === 7 || month === 8 || month === 9) {
      season = 'summer';
    } else if (month === 10 || month === 11 || month === 12) {
      season = 'fall';
    }
  }

  return `${year}-${season}`;
}
