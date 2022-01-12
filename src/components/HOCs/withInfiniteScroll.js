import { useEffect } from 'react';

const withInfiniteScroll = (InnerComponent) => {

  const InfiniteScroll = ({
    className,
    ...props }) => {

    useEffect(() => {

      const handleScroll = () => {
        if (
          window.scrollY + window.innerHeight >= document.body.scrollHeight
        ) {
          setTimeout(() => alert("Fetch...."), 1000)
        }


      }

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [])

    return (
      <div className={className}>
        <InnerComponent {...props} />
      </div>
    );
  }

  return InfiniteScroll;
}

export default withInfiniteScroll;
