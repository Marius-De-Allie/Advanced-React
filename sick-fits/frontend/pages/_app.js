import App, { Container } from 'next/app';
import Page from '../components/Page';
// Custom Nextjs App component.
class MyApp extends App {
    
    render() {
        const { Component } = this.PaymentResponse;
        return (
            <Container>
                <Page>
                    <Component />
                </Page>
            </Container>

        );
    }
};

export default MyApp;