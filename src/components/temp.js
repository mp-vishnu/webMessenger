<div className="container">
<div className="row">
  <div className="col-md-6">
    <div className="signup-image mt-2">
      <figure>
        <img src={loginpic} alt="img" />
      </figure>
    </div>
  </div>
  <div className="col-md-6">
    <section className="signup">
      
      <div className="container mt-5">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Sign up</h2>
            <form className="register-form" id="register-form">
              {/* Form inputs go here */}
              <div className="form-group mt-5">
                                  <label htmlFor="name">
                                  <i className="zmdi zmdi-account material-icons-name mr-4"></i>
                                  </label>
                                  <input type='text' name='name' id='name' autoComplete='off' 
                                      placeholder="Name" style={{border:'none',outline: 'none'}}
                                  />
                              </div>
                                  <div className="form-group">
                                  <label htmlFor="email">
                                  <i className="zmdi zmdi-email material-icons-name mr-4"></i>
                                  </label>
                                  <input type='email' name='email' id='email' autoComplete='off' 
                                      placeholder="Email" style={{border:'none',outline: 'none'}}
                                  />
                              </div>
                              <div className="form-group">
                                  <label htmlFor="phone">
                                  <i className="zmdi zmdi-phone material-icons-name mr-4"></i>
                                  </label>
                                  <input type='phone' name='phone' id='phone' autoComplete='off' 
                                      placeholder="Phone" style={{border:'none',outline: 'none'}}
                                  />
                              </div>
                              <div className="form-group">
                                  <label htmlFor="work">
                                  <i className="zmdi zmdi-slideshow material-icons-name mr-4"></i>
                                  </label>
                                  <input type='work' name='work' id='work' autoComplete='off' 
                                      placeholder="Work" style={{border:'none',outline: 'none'}}
                                  />
                              </div>
                              <div className="form-group">
                                  <label htmlFor="password">
                                  <i className="zmdi zmdi-lock material-icons-name mr-4"></i>
                                  </label>
                                  <input type='password' name='password' id='password' autoComplete='off' 
                                      placeholder="Enter password" style={{border:'none',outline: 'none'}}
                                  />
                              </div>
                              <div className="form-group">
                                  <label htmlFor="cpassword">
                                  <i className="zmdi zmdi-lock material-icons-name mr-4"></i>
                                  </label>
                                  <input type='cpassword' name='cpassword' id='cpassword' autoComplete='off' 
                                      placeholder="Confirm password" style={{border:'none',outline: 'none'}}
                                  />
                              </div>
                          <div className="form-group form-button ml-5">
                              <input type="submit" name="signup" id="signup" className="form-submit"
                              value="register" />
                          </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
</div>