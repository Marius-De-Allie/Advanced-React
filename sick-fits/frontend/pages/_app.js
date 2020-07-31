import App, { Container } from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';
// Custom Nextjs App component.
class MyApp extends App {
    
    render() {
        const { Component, apollo } = this.props;
        return (
            <Container>
                <Page>
                    <Component />
                </Page>
            </Container>
        );
    }
};

export default withData(MyApp);