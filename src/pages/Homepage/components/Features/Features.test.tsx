import {fireEvent, render} from "@testing-library/react";
import Features from "./";

test('clicking on a chip displays the right feature information', () => {
  const { getAllByRole, getByText } = render(<Features />);

  // let's click on the second chip (Feature 2)
  fireEvent.click(getAllByRole('button')[1]);

  expect(getByText('Feature 2')).toBeDefined();
  expect(getByText('Description 2')).toBeDefined();
});
