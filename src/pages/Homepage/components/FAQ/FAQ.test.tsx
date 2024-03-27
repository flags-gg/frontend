import { render, fireEvent, screen } from '@testing-library/react';
import FAQ from './'; // change to your actual component path

describe('FAQ Component', () => {
  it('Should show the answers when clicked', () => {
    render(<FAQ />);
    const question = screen.getByText('What does request mean?');
    fireEvent.click(question);
    const answer = screen.getByText('When a user visits your site, and you are using Flags.gg, a request is made to our servers to determine which features to show the user. This is called a request.');
    expect(answer).toBeDefined();
  });
});
