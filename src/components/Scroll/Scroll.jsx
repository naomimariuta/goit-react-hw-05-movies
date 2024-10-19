/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import debounce from 'debounce';

const Scroll = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const debounceToggleVisibility = debounce(() => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }, 100);

    window.addEventListener('scroll', debounceToggleVisibility);
    return () => {
      window.removeEventListener('scroll', debounceToggleVisibility);
    };
  }, []);

  const style = css`
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: ${isVisible ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 24px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  `;

  return (
    <button css={style} onClick={scrollToTop}>
      ↑
    </button>
  );
};

export default Scroll;
