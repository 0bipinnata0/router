import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from '..';

const HomePage = () => <div>Home Page</div>;
const AboutPage = () => <div>About Page</div>;
describe('Router Component', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    );
    expect(container).toBeDefined();
  });
  
  it('should render correct component for the route', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Home Page')).toBeDefined();
  });

}); 