const HEBREW_ABBREVIATIONS = {
  "מבנת": "מבנה נתונים",
  "מבנ ת": "מבנה נתונים",
  "מבנתא": "מבנה נתונים א",
  "מבנתב": "מבנה נתונים ב",
  "מבנח": "מבנה המחשב",
  "מדמח": "מדעי המחשב",
  "מ ד מ ח": "מדעי המחשב",
  "מבואלמדמח": "מבוא למדעי המחשב",
  "תכפ": "תכנות פונקציונאלי ולוגי",
  "תכפל": "תכנות פונקציונאלי ולוגי",
  "משדיפ": "משוואות דיפרנציאליות",
  "משוואותדפרנציאליות": "משוואות דיפרנציאליות",
  "ניתוחאלגוריתמיםוסיבוכיות": "אלגוריתמים",
  "עקרונותשפותתוכנה": "עקרונות",
  "מינפ": ["מיני פרויקט", "מיני פרויקט בבסיסי נתונים", "מיני פרויקט במערכת חלונות"],
  "מיניפ": ["מיני פרויקט", "מיני פרויקט בבסיסי נתונים", "מיני פרויקט במערכת חלונות"],
  "מיניפבבסנת": "מיני פרויקט בבסיסי נתונים",
  "מיניפבבסיסינתונים": "מיני פרויקט בבסיסי נתונים",
  "מיניפבחלונות": "מיני פרויקט במערכת חלונות",
  "בסנת": "בסיסי נתונים",
};

const HEBREW_FINAL_LETTERS = {
  ך: "כ",
  ם: "מ",
  ן: "נ",
  ף: "פ",
  ץ: "צ",
};

function normalizeHebrewText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[\u0591-\u05C7]/g, "")
    .replace(/["'`׳״]/g, "")
    .replace(/[()\[\]{}.,:;!?\-/_]/g, " ")
    .replace(/[ךםןףץ]/g, (letter) => HEBREW_FINAL_LETTERS[letter] || letter)
    .replace(/\s+/g, " ")
    .trim();
}

function toCompactText(value) {
  return normalizeHebrewText(value).replace(/\s+/g, "");
}

function getAbbreviationExpansions(value) {
  const normalizedValue = toCompactText(value);

  if (!normalizedValue) {
    return [];
  }

  for (const [key, replacement] of Object.entries(HEBREW_ABBREVIATIONS)) {
    if (toCompactText(key) === normalizedValue) {
      return Array.isArray(replacement) ? replacement : [replacement];
    }
  }

  return [];
}

function levenshteinDistance(source, target) {
  if (source === target) {
    return 0;
  }

  if (!source.length) {
    return target.length;
  }

  if (!target.length) {
    return source.length;
  }

  const previousRow = Array.from({ length: target.length + 1 }, (_, index) => index);

  for (let rowIndex = 0; rowIndex < source.length; rowIndex += 1) {
    let lastDiagonal = previousRow[0];
    previousRow[0] = rowIndex + 1;

    for (let columnIndex = 0; columnIndex < target.length; columnIndex += 1) {
      const temp = previousRow[columnIndex + 1];
      const substitutionCost = source[rowIndex] === target[columnIndex] ? 0 : 1;

      previousRow[columnIndex + 1] = Math.min(
        previousRow[columnIndex + 1] + 1,
        previousRow[columnIndex] + 1,
        lastDiagonal + substitutionCost
      );

      lastDiagonal = temp;
    }
  }

  return previousRow[target.length];
}

function maxTokenDistance(tokenLength) {
  if (tokenLength <= 4) {
    return 1;
  }

  if (tokenLength <= 8) {
    return 2;
  }

  return 3;
}

function expandAbbreviations(query) {
  const normalized = normalizeHebrewText(query);
  if (!normalized) {
    return [];
  }

  const variants = new Set([normalized]);
  const compactExpansions = getAbbreviationExpansions(normalized);
  compactExpansions.forEach((expanded) => variants.add(normalizeHebrewText(expanded)));

  const words = normalized.split(" ").filter(Boolean);
  if (words.length > 0) {
    let hasWordExpansion = false;
    const expandedWords = words.map((word) => {
      const [replacement] = getAbbreviationExpansions(word);
      if (replacement) {
        hasWordExpansion = true;
        return normalizeHebrewText(replacement);
      }

      return word;
    });

    if (hasWordExpansion) {
      variants.add(expandedWords.join(" ").trim());
    }
  }

  return Array.from(variants).filter(Boolean);
}

function isTokenMatch(queryToken, haystackToken) {
  if (haystackToken.includes(queryToken) || queryToken.includes(haystackToken)) {
    return true;
  }

  return levenshteinDistance(queryToken, haystackToken) <= maxTokenDistance(queryToken.length);
}

function matchesQueryVariantsInText(haystackText, searchVariants) {
  const haystackTokens = haystackText.split(" ").filter(Boolean);

  return searchVariants.some((variant) => {
    if (!variant) {
      return false;
    }

    if (haystackText.includes(variant)) {
      return true;
    }

    const queryTokens = variant.split(" ").filter(Boolean);
    return queryTokens.every((queryToken) =>
      haystackTokens.some((haystackToken) => isTokenMatch(queryToken, haystackToken))
    );
  });
}

export function matchesCourseTextQuery(text, query) {
  const searchVariants = expandAbbreviations(query);
  if (searchVariants.length === 0) {
    return true;
  }

  const haystackText = normalizeHebrewText(text);
  return matchesQueryVariantsInText(haystackText, searchVariants);
}

export function matchesSummaryQuery(summary, query) {
  const searchVariants = expandAbbreviations(query);
  if (searchVariants.length === 0) {
    return true;
  }

  const haystackText = normalizeHebrewText(`${summary.courseName} ${summary.topic}`);
  return matchesQueryVariantsInText(haystackText, searchVariants);
}
