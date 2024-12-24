import toNumber from "lodash/toNumber";

export default function calculateGoalProgress(
  currentAmount: number,
  goal: number,
) {
  if (!goal || !currentAmount) return 0;

  return toNumber(((currentAmount / goal) * 100).toFixed(0));
}
