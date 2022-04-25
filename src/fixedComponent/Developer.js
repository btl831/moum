import React from 'react';
import './Developer.module.css';
export default function Developer() {
    return (
        <>
            <div className="container ">
                <div className="row pt-4">
                    <div className="col-2 col-md-2 order-md-2">
                        <img src="dev.png" width="100%"/>
                    </div>
                    <div className="col-10 col-md-5 order-md-1" id='info'>
                        <p className=''>신봉규</p>
                        <p>developer</p>
                        <p>1998.06.16</p>
                        <p>daoh98@naver.com</p>
                    </div>
                    <div className="col-md-5 order-md-3"></div>
                </div>


                {/* seconde developer input */}
                <div className="row mt-4">
                    <div className="col-2 col-md-2 order-md-2">
                        <img src="dev.png" width="100%"/>
                    </div>
                    <div class="col-10 col-md-5 order-md-3">
                        <p className=''>신봉규</p>
                        <p>developer</p>
                        <p>1998.06.16</p>
                        <p>daoh98@naver.com</p>
                    </div>
                    <div className="col-md-5 order-md-1"></div>
                </div>
            </div>
        </>
    )
}