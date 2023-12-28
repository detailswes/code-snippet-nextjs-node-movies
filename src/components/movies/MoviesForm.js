import UploadIcon from '../../assets/images/icons/upload.svg';
import InputBox from '../../common/Inputbox';

const MoviesForm = () => {
  return (
    <div className="w-full lg:flex items-start">
      <div className='w-full max-w-[473px] lg:mr-[127px]'>
        <div className="block sm:hidden w-full mt-4 lg:mt-0 max-w-[362px]">
            <InputBox className="inputbox" type="text" name="title" placeholder="Placeholder" />
            <div className="w-full md:max-w-[216px]">
              <InputBox className="inputbox" type="text" name="publish-year" placeholder="publishyear" />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <label className="flex flex-col items-center justify-center w-full min-h-[504px] border-2 border-white border-dashed rounded-xl cursor-pointer bg-input">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadIcon className="mb-2"/>
                    <p className="mb-2">Drop and image here</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
            </label>
        </div>
      </div>        
        <div className="w-full mt-6 lg:mt-0 lg:mb-10 max-w-[362px]">
          <div className='hidden sm:block'>
          <InputBox className="inputbox" type="text" name="title" placeholder="Placeholder" />
          <div className="w-full md:max-w-[216px]">
            <InputBox className="inputbox" type="text" name="publish-year" placeholder="publishyear" />
          </div>
          </div>
          <div className="mt-16 flex justify-between items-center">
            <button className="light-button mr-2">Cancel</button>
            <button className="button ml-2">Submit</button>
          </div>
        </div>
      </div>
  )
}

export default MoviesForm;
