function Divider({ style = {} }: { style?: React.CSSProperties }) {
	return <hr className='border-none bg-primaryAccent2 h-[1px] w-full' style={style} />;
}

export default Divider;
