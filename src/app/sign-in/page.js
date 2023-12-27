import InputBox from "../../common/Inputbox";

const signIn = () => {
  return <>
  <div className="h-screen flex justify-center items-center mx-3.5">
    <div className="max-w-[300px]">
    <h1 className="mb-10 text-center">Sign in</h1>
    <form autocomplete="off">
    <InputBox className="inputbox" type="text" name="email" placeholder="Email"  />
    <InputBox className="inputbox" type="password" name="password" placeholder="Password"  />
    <div className="flex items-center justify-center mb-6">
        <input id="remember-me" type="checkbox" value="" className="w-[18px] h-[18px] mr-2 text-input bg-input accent-primary rounded-lg focus:ring-primary outline-none focus:ring-1"/>
        <label for="remember-me" className="text-sm font-normal text-white">Remember me</label> 
    </div>
    <input className="button" type="submit" value="Login" />
    </form>
    </div>
  </div>
  </>;
};

export default signIn;
