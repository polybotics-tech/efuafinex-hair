import { SCREEN_DIMENSION } from "./dimensions";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "./theme";

const NAIRA_CURRENCY = "₦";
const MINIMUM_DEPOSIT = 100;

export {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  NAIRA_CURRENCY,
  MINIMUM_DEPOSIT,
  SCREEN_DIMENSION,
};

/*//TAKE NOTE OF THIS FOR SORTING WORDS THAT SHOULD BE BOLDEN
//for *
const renderBoldText = (sentence) => {
    // Regex to split the sentence into bold and non-bold parts
    const parts = sentence.split(/(\*.*?\*)/); // Splits into segments including asterisks

    return parts.map((part, index) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        // If the part is surrounded by asterisks, remove them and make it bold
        const word = part.slice(1, -1); // Remove the asterisks
        return (
          <Text key={index} style={{ fontWeight: FONT_WEIGHT.semibold }}>
            {word}
          </Text>
        );
      } else {
        // Normal text
        return <Text key={index}>{part}</Text>;
      }
    });
  };

  //for #
  const renderBoldText = (sentence) => {
    // Regex to split the sentence into bold and non-bold parts
    const parts = sentence.split(/(#.*?#)/); // Splits into segments including hash signs

    return parts.map((part, index) => {
      if (part.startsWith('#') && part.endsWith('#')) {
        // If the part is surrounded by hash signs, remove them and make it bold
        const word = part.slice(1, -1); // Remove the hash signs
        return (
          <Text key={index} style={styles.bold}>
            {word}
          </Text>
        );
      } else {
        // Normal text
        return (
          <Text key={index} style={styles.normal}>
            {part}
          </Text>
        );
      }
    });
  };

  //*/
