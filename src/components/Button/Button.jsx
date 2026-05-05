import { motion } from "framer-motion";
import styled from "styled-components";

const StyledButton = styled(motion.button)`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-family: inherit;
	font-weight: 600;
	cursor: pointer;
	text-decoration: none;
	border-radius: 12px;
	transition: all 0.3s;

	padding: ${({ $size }) =>
		$size === "sm" ? "8px 16px" : $size === "lg" ? "16px 32px" : "12px 24px"};
	font-size: ${({ $size }) =>
		$size === "sm" ? "0.85rem" : $size === "lg" ? "1.1rem" : "1rem"};

	background-color: ${({ $variant }) =>
		$variant === "filled" ? "#1a1a2e" : "transparent"};
	color: ${({ $variant }) => ($variant === "filled" ? "#ffffff" : "#7c6af7")};
	border: 1px solid ${({ $variant }) =>
		$variant === "filled" ? "#1a1a2e" : "#7c6af7"};

	&:hover {
		background-color: ${({ $variant }) =>
			$variant === "filled" ? "#2d2d5e" : "#7c6af7"};
		color: #ffffff;
	}
`;

function Button({ $variant, $size, ...props }) {
	return <StyledButton $variant={$variant} $size={$size} {...props} />;
}

export default Button;
