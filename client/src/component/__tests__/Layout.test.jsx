import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "../layout/Layout";

describe('Layout', () => {
    it('should render Layout component', () => {
        render(
            <Layout>
                <div>test component</div>
            </Layout>
        )

        expect(screen.getByText('test component')).toBeInTheDocument();
    })
})