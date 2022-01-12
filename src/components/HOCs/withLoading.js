import React, { useEffect } from 'react';

const withLoading = (InnerComponent) => {
  const EffectLoading = (
    {
      fetchData,
      className, 
      ...props 
    }) => {
    

    useEffect(() => {

      let container = document.querySelector(`${className}`);

      fetchData();

      const handleScroll = () => {
        if (container?.scrollTop === 0){
          let firstEl = container?.firstElementChild;
          fetchData();
          container.scrollTop = firstEl?.offsetTop;
        }


      }


      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };

    }, [fetchData, className])

    
    return (
      <InnerComponent
        {...props}
      />
    );
  };

  return EffectLoading;
};

export default withLoading;
