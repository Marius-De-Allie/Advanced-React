import App, { Container } from 'next/app';

// Custom Nextjs App component.
class MyApp extends App {
    
    render() {
        const { Component } = this.PaymentResponse;
        return (
            <Container>
                <Component />
            </Container>

        );
    }
};

export default MyApp;