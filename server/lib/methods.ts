// Function to demonstrate heavy computation
// like API requests, database queries, etc.

export const heavyComputation = async (): Promise<void> => {
  let temp: any = 0;
  for (let i = 0; i < 100000; i++) temp = (Math.random() * 5342) % i;
  return temp;
};
