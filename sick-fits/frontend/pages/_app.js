import App, { Container } from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';
// Custom Nextjs App component.
class MyApp extends App {

    static async getInitialProps({ Component, ctx}) {
        let pageProps = {};
        if(Component.getInitialProps) {
            page.Props = await Component.getInitialProps(ctx);        
        }
        // Exposes the query to the user.
        pageProps.query = ctx.query
        return { pageProps };
    }
    
    render() {
        const { Component, apollo, pageProps } = this.props;
        return (
            <Container>
                {/*Wrap entire app in ApolloProvider, so that entire app has access to apollo data*/}
                <ApolloProvider client={apollo}>
                    <Page>
                        <Component />
                    </Page>
                </ApolloProvider>
            </Container>
        );
    }
};

export default withData(MyApp);