import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import { PageWrapper } from "../page-wrapper";

export default function Reports() {
  return (
    <>
      <Header />
      <PageWrapper>
        <Container>
          <h1>Relatórios</h1>
        </Container>
      </PageWrapper>
      <Footer />
    </>
  );
}
